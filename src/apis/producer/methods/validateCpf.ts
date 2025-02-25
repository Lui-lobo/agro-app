export default async function validateCpf(cpf: string) {
    return /^\d{11}$/.test(cpf);
}