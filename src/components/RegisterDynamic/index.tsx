import { useRef, useState } from "react";

export const RegisterDynamic = ({ onFinish }: RegisterDynamicProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const registerDynamic = [
    {
      label: "Documento Pessoal",
      value: "document",
      type: "text",
      placeholder: "Documento Pessoal",
    },
    {
      label: "Nome da mae",
      value: "name",
      type: "text",
      placeholder: "Nome",
    },
    {
      label: "É maior de idade?",
      value: "age",
      type: "checkbox",
      placeholder: "É maior de idade?",
    },
  ];

  const [registerDynamicCustom, setRegisterDynamicCustom] = useState({
    all: registerDynamic.length,
    current: 0,
  });

  const [dataDynamic, setDataDynamic] = useState<{
    [key: string]: string;
  }>({});

  const RenderRegister = () => {
    const register = registerDynamic[registerDynamicCustom.current];
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDataDynamic((prev) => ({
            ...prev,
            [register.value]: inputRef.current!.value,
          }));
          const data = {
            ...dataDynamic,
            [register.value]: inputRef.current!.value,
          };
          if (registerDynamicCustom.current === registerDynamic.length - 1) {
            onFinish(data);
            return;
          }
          setRegisterDynamicCustom({
            all: registerDynamic.length,
            current: registerDynamicCustom.current + 1,
          });
          if (inputRef.current) inputRef.current.value = "";
        }}
        className="container-register"
      >
        <label>{register.label}</label>
        <input
          type={register.type}
          ref={inputRef}
          name={register.value}
          placeholder={register.placeholder}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  };

  return <div>{RenderRegister()}</div>;
};
