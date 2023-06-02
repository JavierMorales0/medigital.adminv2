import ToogleThemeButton from "@/components/ui/ToogleThemeButton.jsx";
import { Button } from "primereact/button";
import AutoCompleteToolsContainer from "@/components/domain/tools/AutoCompleteToolsContainer.jsx";
import ProfileContainer from "@/components/domain/users/ProfileContainer.jsx";

const NavbarContainer = () => {
  return (
    <nav style={style.container}>
      <div style={style.actionsContainer}>
        <AutoCompleteToolsContainer />
        <ProfileContainer />
        <Button icon="pi pi-plus" aria-label="agregar consulta" />
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
