import CadasterView from "@/components/CadasterCompany/CadasterView";
import Layout from "@/components/Layout";
import EmptyHeader from "@/components/Layout/Header/EmptyHeader";
import BasePage from "@/components/Lib/BasePage";

export default function CadasterCompany() {
  return (
    <Layout>
      <BasePage header={<EmptyHeader title={"Cadastrar Empresa"} />}>
        <CadasterView />
      </BasePage>
    </Layout>
  );
}
