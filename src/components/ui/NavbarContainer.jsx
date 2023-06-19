import ToogleThemeButton from "@/components/ui/ToogleThemeButton.jsx";
import { Button } from "primereact/button";
import AutoCompleteToolsContainer from "@/components/domain/tools/AutoCompleteToolsContainer.jsx";
import ProfileContainer from "@/components/domain/users/ProfileContainer.jsx";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";
import {useNavigate} from "react-router-dom";

const NavbarContainer = () => {
  const temporalConsutState = useTemporalConsultState();
  const navigate = useNavigate();
  const handleCreateConsult = () => {
      temporalConsutState?.init()
      navigate('/sala-de-espera')
  }
  return (
    <nav style={style.container}>
      <div style={style.actionsContainer}>
        <AutoCompleteToolsContainer />
        <ProfileContainer />
        <Button icon="pi pi-plus" aria-label="agregar consulta" onClick={handleCreateConsult} />
      </div>
      <div>
        <ToogleThemeButton hideLabel styleProp={style.themeButton} />
      </div>
    </nav>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 32px",
    height: "80px",
    boxShadow: "0px 3px 28px -7px var(--highlight-bg)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "var(--surface-0)",
  },
  actionsContainer: {
    width: "50%",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  themeButton: {
    borderRadius: "100%",
  },
};

export default NavbarContainer;
