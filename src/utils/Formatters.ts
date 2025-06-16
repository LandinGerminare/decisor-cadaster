export function maskCNPJ(value: string) {
  return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .replace(/^(\d{2})(\d)/, "$1.$2") // Coloca o ponto após os 2 primeiros números
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Segundo ponto
    .replace(/\.(\d{3})(\d)/, ".$1/$2") // Coloca a barra
    .replace(/(\d{4})(\d)/, "$1-$2") // Coloca o traço
    .replace(/(-\d{2})\d+?$/, "$1"); // Impede que digite mais que 14 números
}
