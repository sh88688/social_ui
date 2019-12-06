//Icons Material UI
import {ShopIcon, SettingIcon,ProfileIcon, SupportIcon,AccountIcon,LogoutIcon,PeopleIcon} from "../theme/muiIcons";


const _SINGLE_ = "single";
const _CONTAINED_ = "contained";
const _DIVIDER_ = "divider";
const Modules = [
{
    type: _SINGLE_,
    name: "Google Play",
    icon: ShopIcon,
    path: "/googleReviews",
    isAddIcon: false
},
{
    type: _SINGLE_,
    name: "Integration",
    icon: SettingIcon,
    path: "/integration",
    isAddIcon: false
},
{
    type: _SINGLE_,
    name: "Users",
    icon: PeopleIcon,
    path: "/users",
    isAddIcon: false
},
{
    type: _DIVIDER_
},
{
    type: _SINGLE_,
    name: "Support",
    icon: SupportIcon,
    path: "/support",
    isAddIcon: false
},
{
    type: _CONTAINED_,
    name: "Account",
    icon: AccountIcon,
    open: false,
    subModule: [{
            name: "Profile",
            icon: ProfileIcon,
            path: "/profile",
        },
        {
            name: "Account Setting",
            icon: SettingIcon,
            path: "/accountSetting",
        }
    ]
},
{
    type: _SINGLE_,
    name: "Logout",
    icon: LogoutIcon,
    path: "/logout",
    isAddIcon: true
},
];

export default Modules;
