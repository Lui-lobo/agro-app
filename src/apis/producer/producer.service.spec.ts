import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common'; // Importando a exceção
// Importando serviços a serem testados
import { ProducerService } from './producer.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CryptoService } from '../../utils/services/encryptionService';
import validateCnpj from '../producer/methods/validateCnpj';
import validateCpf from '../producer/methods/validateCpf';
// Importando controllers
import { ProducerController } from './producer.controller';
// Importando metodo de criação de produtor
import createProducer from '../producer/methods/createProducer';
// Importando DTO de criação de produtor
import { CreateProducerDto } from 'src/utils/dtos/producer/producer.dto';
// Criando Mocks
jest.mock('../../utils/services/encryptionService'); // Mock do cryptoService
jest.mock('../producer/methods/createProducer'); // Mock de createProducer
jest.mock('../producer/methods/validateCpf'); // Mock de validateCpf
jest.mock('../producer/methods/validateCnpj'); // Mock de validateCnpj

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
              create: jest.fn(),
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

  it('should create a valid producer with cpf', async () => {
    const cryptoService = new CryptoService(); // Instancia do serviço de criptografia
    const createProducerDto: CreateProducerDto = { name: 'Otavio Dos Santos', cpf: '12345678900' } as CreateProducerDto; // Dados de teste com CPF
    const expectedResult = { name: 'Otavio Dos Santos', cpf: '1Fh2ViCs10uCn6owQ0A7yA==', id: 'idDeTeste', cnpj: null, createdAt: new Date() }; // Resultado esperado

    // Cpf deve passar na validação de cpf
    jest.mocked(validateCpf).mockResolvedValue(true);
    // Valor que deve ser retornado do serviço de criptografia
    jest.mocked(cryptoService.encrypt).mockReturnValue('1Fh2ViCs10uCn6owQ0A7yA==');
    // Valor esperado de retorno da função de criar produtor
    jest.mocked(createProducer).mockResolvedValue(expectedResult);

    const result = await controller.create(createProducerDto);

    // Esperamos que createProducer tenha sido chamado com os dados de uma requisição normal
    expect(createProducer).toHaveBeenCalledWith(prismaService, { ...createProducerDto, cpf: '12345678900' });
    // Resultado deve ser igual ao esperado!
    expect(result).toEqual(expectedResult);
  });

  it('should create a valid producer with cnpj', async () => {
    const cryptoService = new CryptoService(); // Instancia do serviço de criptografia
    const createProducerDto: CreateProducerDto = { name: 'Henrique Dos Santos', cnpj: '25749836000114' } as CreateProducerDto; // Dados de teste com CNPJ
    const expectedResult = { name: 'Henrique Dos Santos', cpf: null, id: 'idDeTeste2', cnpj: 'kAvYXLySL9xapgQ9ufkJBg==', createdAt: new Date() }; // Resultado esperado

    // Cnpj deve passar na validação de Cnpj
    jest.mocked(validateCnpj).mockResolvedValue(true);
    // Valor que deve ser retornado do serviço de criptografia
    jest.mocked(cryptoService.encrypt).mockReturnValue('kAvYXLySL9xapgQ9ufkJBg==');
    // Valor esperado de retorno da função de criar produtor
    jest.mocked(createProducer).mockResolvedValue(expectedResult);

    const result = await controller.create(createProducerDto);

    // Esperamos que createProducer tenha sido chamado com os dados de uma requisição normal
    expect(createProducer).toHaveBeenCalledWith(prismaService, { ...createProducerDto, cnpj: '25749836000114' });

    // Resultado deve ser igual ao esperado!
    expect(result).toEqual(expectedResult);
  });

  it('should throw an UnauthorizedException when CNPJ is invalid', async () => {
      const createProducerDto = { name: 'Henrique carvalho', cnpj: '257a98360c0114213234' } as CreateProducerDto;

      // Simula a rejeição da Promise com a mensagem de erro
      (createProducer as jest.Mock).mockRejectedValue(new UnauthorizedException('Invalid CNPJ'));

      // Mock da validação do CNPJ para retornar falso
      jest.mocked(validateCnpj).mockResolvedValue(false);

      // Verifica se a exceção é lançada
      await expect(service.create(createProducerDto)).rejects.toThrow(UnauthorizedException);
      await expect(service.create(createProducerDto)).rejects.toThrow('Invalid CNPJ');
  });

  it('should throw an UnauthorizedException when Cpf is invalid', async () => {
      const createProducerDto = { name: 'Otavio Henrique', cpf: '475ascw3221412312' } as CreateProducerDto;

      // Simula a rejeição da Promise com a mensagem de erro
      (createProducer as jest.Mock).mockRejectedValue(new UnauthorizedException('Invalid CPF'));

      // Mock da validação do CNPJ para retornar falso
      jest.mocked(validateCpf).mockResolvedValue(false);

      // Verifica se a exceção é lançada
      await expect(service.create(createProducerDto)).rejects.toThrow(UnauthorizedException);
      await expect(service.create(createProducerDto)).rejects.toThrow('Invalid CPF');
  });
  
  it('should throw an BadRequestException because the cpf already exists!', async () => {
      const createProducerDto = { name: 'Otavio Dos Santos', cpf: '12345678900' } as CreateProducerDto;

      // Simula a rejeição da Promise com a mensagem de erro
      (createProducer as jest.Mock).mockRejectedValue(new BadRequestException('The CPF sended already exists!.'));

      // Mock da validação do CNPJ para retornar falso
      jest.mocked(validateCpf).mockResolvedValue(false);

      // Verifica se a exceção é lançada
      await expect(service.create(createProducerDto)).rejects.toThrow(BadRequestException);
      await expect(service.create(createProducerDto)).rejects.toThrow('The CPF sended already exists!.');
  });

  it('should throw an BadRequestException because the cpf already exists!', async () => {
      const createProducerDto = { name: 'Henrique carvalho', cnpj: '25749836000114' } as CreateProducerDto;

      // Simula a rejeição da Promise com a mensagem de erro
      (createProducer as jest.Mock).mockRejectedValue(new BadRequestException('The CNPJ sended already exists!.'));

      // Mock da validação do CNPJ para retornar falso
      jest.mocked(validateCpf).mockResolvedValue(false);

      // Verifica se a exceção é lançada
      await expect(service.create(createProducerDto)).rejects.toThrow(BadRequestException);
      await expect(service.create(createProducerDto)).rejects.toThrow('The CNPJ sended already exists!.');
  });
      
});