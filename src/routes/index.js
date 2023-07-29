import ClassSchedule from "../pages/Components/SinhVien/ClassSchedule";
import Performance from "../pages/Components/SinhVien/Performance";
import Home from "../pages/Home";
import ClassRegistration from "../pages/Components/SinhVien/ClassRegistration";
import SinhVienLogin from "../pages/Components/SinhVien/Login";
import SinhVienRegister from "../pages/Components/SinhVien/Register";
import Profile from "../pages/Components/SinhVien/Profile";
import RegisteredClass from "../pages/Components/SinhVien/RegisteredClass";
import CoVanLayOut from "../Components/Layouts/CovanLayout"
//Cố vấn
import CoVanLogin from "../pages/Components/CoVan/Login"
import CoVanRegister from "../pages/Components/CoVan/Register"
import CoVanProfile from "../pages/Components/CoVan/Profile"
import CoVanHome from "../pages/Components/CoVan/Home"
import DangKyTinChi from "../pages/Components/CoVan/DangKyTinChi";
//Admin
import adminLogin from "../pages/Components/Admin/Login"
import adminHome from "../pages/Components/Admin/Home"
import adLopTC from "../pages/Components/Admin/LopTC";
const publicRoutes = [
    {path: '/', component: Home, layout: null},
    {path: '/classschedule', component: ClassSchedule},
    {path: '/performance', component: Performance},
    {path: '/user/login', component: SinhVienLogin},
    {path: '/user/register', component: SinhVienRegister},
    {path:'/classregistration', component: ClassRegistration},
    {path:'/profile', component: Profile},
    {path:'/registeredclass', component: RegisteredClass},
    {path:'/covan/login', component:CoVanLogin, layout:CoVanLayOut},
    {path:'/covan/register', component:CoVanRegister, layout:CoVanLayOut},
    {path:'/covan/profile', component:CoVanProfile, layout:CoVanLayOut},
    {path:'/covan/home', component:CoVanHome, layout:CoVanLayOut},
    {path:'/covan/loptinchi/:sinhvienID', component:DangKyTinChi, layout:CoVanLayOut},
    {path:'/admin/login', component:adminLogin, layout:CoVanLayOut},
    {path:'/admin/home', component:adminHome, layout:null},
    {path:'/admin/loptinchi', component:adLopTC, layout:null}
]
export {publicRoutes}