import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common'; // Importando a exceção
// Importando serviços a serem testados
import { ProducerService } from '../../producer.service';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CryptoService } from '../../../../utils/services/encryptionService';
// Importando controllers
import { ProducerController } from '../../producer.controller';
// Importando metodo de criação de produtor
import updateProducer from '../updateProducer';
// Importando DTO de criação de produtor
import { UpdateProducerDto } from 'src/utils/dtos/producer/producer.dto';
// Criando Mocks
jest.mock('../../../../utils/services/encryptionService'); // Mock do cryptoService
jest.mock('../updateProducer'); // Mock de createProducer

describe('Producer Service', () => {
  let controller: ProducerController;
  let service: ProducerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        ProducerService,
        {
          provide: PrismaService,
          useValue: {
            producer: {
              update: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn()
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
    service = module.get<ProducerService>(ProducerService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

   // ------------------- Testes de sucesso da update producer ------------------- //
  it('should update a producer by his identifier and change name and cpf', async () => {
    const cryptoService = new CryptoService(); // Instancia do serviço de criptografia
    const updateProducerDto: UpdateProducerDto = { id: "52f06fe8-4e24-4fcd-8bdf-da84160354a9", name: 'Henrique Dos Santos atualizado', cpf: '12345678920' } as UpdateProducerDto;
    const expectedResult = { name: 'Henrique Dos Santos atualizado', cpf: '+nesjHHZ3dRIDYsrmx2Bzw==', id: '52f06fe8-4e24-4fcd-8bdf-da84160354a9', cnpj: null, createdAt: new Date() }; // Resultado esperado

    const existingProducer = { 
        id: '52f06fe8-4e24-4fcd-8bdf-da84160354a9', 
        name: 'Henrique Dos Santos', 
        cpf: 'oldEncryptedCpf',
        cnpj: null,
        createdAt: new Date()
    };

    // Mock para encontrar o produtor enviado
    jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
    // Mock para verificar se o CPF já existe em outro produtor
    jest.spyOn(prismaService.producer, 'findFirst').mockResolvedValue(null);
    // Valor que deve ser retornado do serviço de criptografia
    jest.mocked(cryptoService.encrypt).mockReturnValue('+nesjHHZ3dRIDYsrmx2Bzw==');
    // Valor esperado de retorno da função de criar produtor
    jest.mocked(updateProducer).mockResolvedValue(expectedResult);

    const result = await controller.update(updateProducerDto);

    // Esperamos que createProducer tenha sido chamado com os dados de uma requisição normal
    expect(updateProducer).toHaveBeenCalledWith(prismaService, { ...updateProducerDto, cpf: '12345678920' });

    // Resultado deve ser igual ao esperado!
    expect(result).toEqual(expectedResult);
  });

  it('should update a producer by his identifier and change name and cnpj', async () => {
    const cryptoService = new CryptoService(); // Instancia do serviço de criptografia
    const updateProducerDto: UpdateProducerDto = { id: "25d19a33-2d7f-4c17-bed9-cf5c10dae684", name: 'Lucas Dos Santos atualizado', cnpj: '00000000000001' } as UpdateProducerDto;
    const expectedResult = { name: 'Lucas Dos Santos atualizado', cnpj: 'SW88JA6E9ywN3mBgYJ5wFQ==', id: '25d19a33-2d7f-4c17-bed9-cf5c10dae684', cpf: null, createdAt: new Date() }; // Resultado esperado

    const existingProducer = { 
        id: '52f06fe8-4e24-4fcd-8bdf-da84160354a9', 
        name: 'Lucas Dos Santos', 
        cnpj: 'oldEncryptedCnpj',
        cpf: null,
        createdAt: new Date()
    };

    // Mock para encontrar o produtor enviado
    jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
    // Mock para verificar se o CPF já existe em outro produtor
    jest.spyOn(prismaService.producer, 'findFirst').mockResolvedValue(null);
    // Valor que deve ser retornado do serviço de criptografia
    jest.mocked(cryptoService.encrypt).mockReturnValue('SW88JA6E9ywN3mBgYJ5wFQ==');
    // Valor esperado de retorno da função de criar produtor
    jest.mocked(updateProducer).mockResolvedValue(expectedResult);

    const result = await controller.update(updateProducerDto);

    // Esperamos que createProducer tenha sido chamado com os dados de uma requisição normal
    expect(updateProducer).toHaveBeenCalledWith(prismaService, { ...updateProducerDto, cnpj: '00000000000001' });

    // Resultado deve ser igual ao esperado!
    expect(result).toEqual(expectedResult);
  });
  
  // ---------------------- Testes de exceções ---------------------- //
  // Caso tenhamos mais tempo, podemos adicionar mais verificações principalmente nos dados de chamadas de função
  it('should throw an notFoundException because the id sent dont exists!', async () => {
      const updateProducerDto = { id: 'IdNaoExistente' ,name: 'Otavio Dos Santos', cpf: '12345678900' } as UpdateProducerDto;

      // Mock para não encontrar o produtor enviado
      jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(null);
      // Simula a rejeição da Promise com a mensagem de erro
      jest.mocked(updateProducer).mockRejectedValue(new NotFoundException(`Producer with id ${updateProducerDto.id} not found`));

      // Verifica se a exceção é lançada
      await expect(service.update(updateProducerDto)).rejects.toThrow(NotFoundException);
      await expect(service.update(updateProducerDto)).rejects.toThrow(`Producer with id ${updateProducerDto.id} not found`);
  });

  it('should throw an ConflictException because the id sent cpf sent is already in use!', async () => {
        const updateProducerDto = { id: '52f06fe8-4e24-4fcd-8bdf-da84160354a9' ,name: 'Otavio Dos Santos', cpf: '12345678920' } as UpdateProducerDto;

        const existingProducer = { 
            id: '52f06fe8-4e24-4fcd-8bdf-da84160354a9', 
            name: 'Henrique Dos Santos', 
            cpf: 'oldEncryptedCpf',
            cnpj: null,
            createdAt: new Date()
        };
        
        const existingProducerWithSameCpf = {
            id: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82', 
            name: 'Luiz Dos Santos', 
            cpf: 'NewEncryptedCpf',
            cnpj: null,
            createdAt: new Date()
        }

        // Mock para não encontrar o produtor enviado
        jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
        // Mock para verificar se o CPF já existe em outro produtor
        jest.spyOn(prismaService.producer, 'findFirst').mockResolvedValue(existingProducerWithSameCpf);
        // Simula a rejeição da Promise com a mensagem de erro
        jest.mocked(updateProducer).mockRejectedValue(new ConflictException(`CPF ${updateProducerDto.cpf} is already in use by another producer`));

        // Verifica se a exceção é lançada
        await expect(service.update(updateProducerDto)).rejects.toThrow(ConflictException);
        await expect(service.update(updateProducerDto)).rejects.toThrow(`CPF ${updateProducerDto.cpf} is already in use by another producer`);
    });

    it('should throw an ConflictException because the id sent CNPJ sent is already in use!', async () => {
        const updateProducerDto = { id: '25d19a33-2d7f-4c17-bed9-cf5c10dae684' ,name: 'Otavio Dos Santos', cnpj: '00000000000001' } as UpdateProducerDto;

        const existingProducer = { 
            id: '25d19a33-2d7f-4c17-bed9-cf5c10dae684', 
            name: 'Henrique Dos Santos', 
            cnpj: 'oldEncryptedCnpj',
            cpf: null,
            createdAt: new Date()
        };
        
        const existingProducerWithSameCpf = {
            id: '219de228-e9ef-48d9-908b-062cf9ed1a8a', 
            name: 'Luiz Dos Santos', 
            cnpj: 'NewEncryptedCnpj',
            cpf: null,
            createdAt: new Date()
        }

        // Mock para não encontrar o produtor enviado
        jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
        // Mock para verificar se o CPF já existe em outro produtor
        jest.spyOn(prismaService.producer, 'findFirst').mockResolvedValue(existingProducerWithSameCpf);
        // Simula a rejeição da Promise com a mensagem de erro
        jest.mocked(updateProducer).mockRejectedValue(new ConflictException(`CNPJ ${updateProducerDto.cpf} is already in use by another producer`));

        // Verifica se a exceção é lançada
        await expect(service.update(updateProducerDto)).rejects.toThrow(ConflictException);
        await expect(service.update(updateProducerDto)).rejects.toThrow(`CNPJ ${updateProducerDto.cpf} is already in use by another producer`);
    });

    it('should throw an InternalServerErrorException because of a internal error in the api!', async () => {
        const updateProducerDto = {  id: undefined, name: 'Otavio Dos Santos', cnpj: '00000000000001' } as UpdateProducerDto;
        const err = 'undefined was sent to search on ORM'

        // Mock para não encontrar o produtor enviado
        jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(null);
        // Mock para verificar se o CPF já existe em outro produtor
        jest.spyOn(prismaService.producer, 'findFirst').mockResolvedValue(null);
        // Simula a rejeição da Promise com a mensagem de erro
        jest.mocked(updateProducer).mockRejectedValue(new InternalServerErrorException(`Error updating producer with id ${updateProducerDto.id}: ${err}`));

        // Verifica se a exceção é lançada
        await expect(service.update(updateProducerDto)).rejects.toThrow(InternalServerErrorException);
        await expect(service.update(updateProducerDto)).rejects.toThrow(`Error updating producer with id ${updateProducerDto.id}: ${err}`);
    });
});