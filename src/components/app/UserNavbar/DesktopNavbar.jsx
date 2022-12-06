import UserIcon from "images/user.png";
import { SideNavbar, SideNavbarComponents as S } from "components/ui";
import { useNavbar } from "components/ui/Navbar/Navbar";
import userLinks from "./user-links";

const DesktopNavbar = (props) => {
  return (
    <SideNavbar>
      <S.BrandLink exact to="/">
        Verve
      </S.BrandLink>

      <S.NavGroup>
        {userLinks
          .filter(
            (link) =>
              link.name !== "Workout" ||
              (props.isWorkout.status === "success" && props.isWorkout.data)
          )
          .map((link, i) => {
            return (
              <li key={`${link.name}-${i}`}>
                <S.AppNavLink title={link.name} to={link.to} icon={link.icon} />
              </li>
            );
          })}
      </S.NavGroup>

      <S.UserLink
        to="/user"
        activeClassName="activeUserLink"
        icon={UserIcon}
        username={props.username}
      />
    </SideNavbar>
  );
};

export default DesktopNavbar;
