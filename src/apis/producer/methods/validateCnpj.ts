export default async function validateCnpj(cnpj: string) {
    return /^\d{14}$/.test(cnpj);
}