export const menuOptions: MenuItem[] = [
  {
    route: "/cadaster-usuario",
    name: "Cadastrar Usuário",
  },
  {
    route: "/cadaster-company",
    name: "Cadastrar Empresa",
  },
];

export interface MenuItem {
  name: string;
  route: string;
}
