import alg from "./pages/alg";
import tuples from "./pages/tuples";
import {ALG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TUPLES_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";

export const Routes = [
    {
        path: ALG_ROUTE,
        Component: alg
    },
    {
        path: TUPLES_ROUTE,
        Component: tuples
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]