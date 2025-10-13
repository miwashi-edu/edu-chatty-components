import {SideNav} from ".";
import { withRouter, withConfig, withAuth  } from "@/test-util";

export default {
    title: "Menus/SideNav",
    component: SideNav,
    decorators: [withAuth, withConfig, withRouter],
};

export const Default = {};
export const HomeActive = { parameters: { router: { initialEntries: ["/"] } } };
export const DebugActive = { parameters: { router: { initialEntries: ["/debug"] } } };
