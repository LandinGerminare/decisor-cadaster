import CadasterView from "@/components/CadasterUser/CadasterView";
import Layout from "@/components/Layout";
import EmptyHeader from "@/components/Layout/Header/EmptyHeader";
import BasePage from "@/components/Lib/BasePage";

export default function CadasterPage() {
  return (
    <Layout>
      <BasePage header={<EmptyHeader title={"Cadastrar Usuário"} />}>
        <CadasterView />
      </BasePage>
    </Layout>
  );
}