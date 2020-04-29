//Icons Material UI
import {ShopIcon,FacebookIcon, InstagramIcon, ConfirmationNumberIcon, DescriptionIcon, SettingIcon,ProfileIcon, SupportIcon,AccountIcon,LogoutIcon,PeopleIcon} from "../theme/muiIcons";
import { ROUTE_FOLDER } from '../Configs/apiConf';

const _SINGLE_ = "single";
const _CONTAINED_ = "contained";
const _DIVIDER_ = "divider";
const Modules = [
{
    type: _SINGLE_,
    name: "Google Play",
    icon: ShopIcon,
    path: `${ROUTE_FOLDER}/google_play`,
    isAddIcon: false
},
{
    type: _SINGLE_,
    name: "Facebook",
    icon: FacebookIcon,
    path: `${ROUTE_FOLDER}/facebook`,
    isAddIcon: false
},
{
    type: _SINGLE_,
    name: "Instagram",
    icon: InstagramIcon,
    path: `${ROUTE_FOLDER}/instagram`,
    isAddIcon: false
},
{
    type: _SINGLE_,
    name: "Integration",
    icon: SettingIcon,
    path: `${ROUTE_FOLDER}/integration`,
    isAddIcon: false
},
{
    type: _SINGLE_,
    name: "Agents",
    icon: PeopleIcon,
    path: `${ROUTE_FOLDER}/agents`,
    isAddIcon: false
},
{
    type: _SINGLE_,
    name: "Ticket Details",
    icon: ConfirmationNumberIcon,
    path: `${ROUTE_FOLDER}/tickets`,
    isAddIcon: false
},
{
    type: _SINGLE_,
    name: "Templates",
    icon: DescriptionIcon,
    path: `${ROUTE_FOLDER}/templates`,
    isAddIcon: false
},
{
    type: _DIVIDER_
},
{
    type: _SINGLE_,
    name: "Support",
    icon: SupportIcon,
    path: `${ROUTE_FOLDER}/support`,
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
            path: `${ROUTE_FOLDER}/profile`,
        },
        {
            name: "Account Setting",
            icon: SettingIcon,
            path: `${ROUTE_FOLDER}/accountSetting`,
        }
    ]
},
{
    type: _SINGLE_,
    name: "Logout",
    icon: LogoutIcon,
    onClickSet: true,
    path: `${ROUTE_FOLDER}/logout`,
    isAddIcon: true
},
];

export default Modules;
