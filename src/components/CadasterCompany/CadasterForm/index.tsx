import { api } from "@/api/api";
import Button from "@/components/FormComponents/Button";
import Input from "@/components/FormComponents/Input";
import { customStyles } from "@/styles/SelectReact";
import { maskCNPJ } from "@/utils/Formatters";
import { useReducer, useState } from "react";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";

interface FormState {
  cnpj: string;
  name: string;
  trade_name: string;
  external_id: string;
  city_id: number;
}

type FormAction =
  | { type: "setCnpj"; payload: string }
  | { type: "setRealName"; payload: string }
  | { type: "setTradeName"; payload: string }
  | { type: "setExternalId"; payload: string }
  | { type: "setCityId"; payload: number }
  | { type: "reset" };

const initialState: FormState = {
  cnpj: "",
  name: "",
  trade_name: "",
  external_id: "",
  city_id: 0,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "setCnpj":
      return { ...state, cnpj: action.payload };
    case "setRealName":
      return { ...state, name: action.payload };
    case "setTradeName":
      return { ...state, trade_name: action.payload };
    case "setExternalId":
      return { ...state, external_id: action.payload };
    case "setCityId":
      return { ...state, city_id: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

type OptionType = {
  label: string;
  value: string;
};

export default function CadasterForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);

  const loadCities = async (inputValue: string): Promise<OptionType[]> => {
    if (!inputValue) return [];

    try {
      const { data } = await api.get(
        `/v1/geo/search-cities?name=${encodeURIComponent(inputValue)}`
      );

      return data.cities.map((city: any) => ({
        value: city.id.toString(),
        label: `${city.name} - ${city.state.acronym}`,
      }));
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      return [];
    }
  };

  const handleSubmit = async () => {
    try {
      await api.post("/v1/company/new", state);
      toast.success("Empresa cadastrada com sucesso!");
      dispatch({ type: "reset" });
      setSelectedCity(null);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.display_text || "Erro desconhecido";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 max-w-7xl w-full">
      <div className="flex w-full gap-4 justify-center">
        <Input
          label="CNPJ"
          componentStyle="w-full"
          value={maskCNPJ(state.cnpj)}
          onChange={(e) =>
            dispatch({
              type: "setCnpj",
              payload: e.target.value.replace(/\D/g, ""),
            })
          }
        />
        <Input
          label="Name"
          componentStyle="w-full"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "setRealName", payload: e.target.value })
          }
        />
      </div>
      <div className="flex w-full gap-4 justify-center">
        <Input
          label="Trade Name"
          componentStyle="w-full"
          value={state.trade_name}
          onChange={(e) =>
            dispatch({ type: "setTradeName", payload: e.target.value })
          }
        />
        <Input
          label="External ID"
          componentStyle="w-full"
          value={state.external_id}
          onChange={(e) =>
            dispatch({ type: "setExternalId", payload: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-1">Cidade</label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          placeholder="Selecione"
          loadOptions={loadCities}
          value={selectedCity}
          onChange={(selected: SingleValue<OptionType>) => {
            if (selected) {
              dispatch({ type: "setCityId", payload: Number(selected.value) });
              setSelectedCity(selected);
            } else {
              setSelectedCity(null);
            }
          }}
          isSearchable
          styles={customStyles}
        />
      </div>

      <Button
        title="Cadastrar Usuário"
        containerStyle="w-full mt-10"
        onClick={handleSubmit}
      />
    </div>
  );
}
