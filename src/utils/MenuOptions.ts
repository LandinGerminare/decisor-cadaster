export const menuOptions: MenuItem[] = [
  {
    route: "/cadaster-usuario",
    name: "Cadastrar Usuário",
    requireBranchAndProduct: true,
  },
];

export interface MenuItem {
  name: string;
  route: string;
  requireBranchAndProduct: boolean;
}
