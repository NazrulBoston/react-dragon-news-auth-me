/**
 * *****. context amra create kori bcz kono functionality amra bivinno jaigai share karbo, ata j shudu
 * j authentication hoite hobe amon na, aro onek jinis ase jkhane context create kare bivinnno jaigai
 * share karte parbo ba access karte parbo
 * ****. oneke src ar context namer folder kare thake, amra akhane providers name karsi tar por 
 * AuthProvider
 * 
 * 1. prothome createContext create karte hobe and tar man chaile null diba, surute export diba jno onno jaiga
 * theke use karte paro
 * 
 *      export const AuthContext = createContext(null);

 * 2. tarpor atake jokhon amra use karbo tokhon amra provider ar moddhe die dibo and div ar 
poriborte <AuthContext.Provider> bosabo.  props ar moddhe ({children}) namta bosate hobe jeta naki bydefault chole
ase, and sei children take amra use karbo


const AuthProvider = ({children}) => {
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    );
};

3. tarpor main.jsx file a <RouterProvider> ke amr rekhe dibo <AuthProvider> ar modhe 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)

4. tarpor <AuthProvider> ar vitore kono value set kare diba and sete <AuthContext.Provider>
vitore jodi value hisebe pathai dei tahole authInfo vitore jta jta bosabo sob jaiga theke amra
sete use karte parbo


const AuthProvider = ({ children }) => {
    const authInfo = {}
    return (
        <AuthContext.Provider value={authInfo}>
        .......
        ......

5. user sign in karbe and sign out karbe, jokhon sign out karbe tokhon kono man thake na ar jonno
function ar vitore akta state declare karbo and value dibo null
    const[user, setUser] = useState(null)

5. tarpor firebase ar go to docs + build + authentication + web + Get started  theke kisu jinis import karte hobe agulo sometimes auto
import hote chaina
import { getAuth } from "firebase/auth";

tarpor arekta const ase seta funciton ar upore bosate hobe and app ta jehetu amra firabse theke esport kare felsi tai akhane paste karar
por app theke p kete abr natun kare p likhle import dekhabe firebase theke and seta import karbo

6. Tarpor ai application k register karte hobe ar jonno firebase password authentication a Get Started ar akta niche ase oikhan theke 
 createUserWithEmailAndPassword(auth, email, password) ai jinis ta lagbe. ai 3 ta jinis auth, email, password ar moddhe aikhane(AuthProvider) auth ase
 and email and password ase Register ar moddhe ar jonno amder vagavagi karte hobe.
 amdr akta function likhbo createUSer name ebong ar vitore parmeter nibo duita (email, password). ai createUser function email, password and akhankar auth
 nie firebase ar createUserWithEmailAndPassword ke call kare dibe and return kare dibe, and upore createUserWithEmailAndPassword aita import kare nibe

 const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
amra akhane declare karsi r use karbe Register page, ar jonno amra akhan theke pathai dibo ai createUser take, and pathao const authInfo ar vitore

7. amra authInfo value gulo kintu export karinai akhane context ar moddhe bosai disi, sorasori bosai nai akhane akta obeject ar moddhe rakhsi and oi obeject ta 
context ar moddhe rakhsi. object ar moddhe onek kisui thakte pare amder jodi sudhu createUser lage tahole createUser kei destructure karbo.
Resgister.jsx file a   useContext(AuthContext);  useContext likhar sathe sathai react theke import hobe  and (AuthContext) lekhar satha sathe aita import hobe 
porviders theke tarpor oi const name ar por {} vitore createUser k destructure karbo
  const { createUser } = useContext(AuthContext)

8. Register.jsx file a amra create user karbo 

        // create user
        createUser(email, password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.error(error)
        })
atotuku karle console a user take dekha jabe 

9. amra console a dekhte parleo user take akhono context a set karte parini ar jonno onAuthStateChanged a namer akta jinis die set karte hobe ar jonno Manage Users 
a jete hobe between Get stared and Password Authentication ar moddhe

onAuthStateChanged 2 ta parameter nei akta hosse auth and arekta hosse callback function, ebong oi callback function ar moddhe akta parameter ase 
user ba currentUser. amra jehetu aita nije click karbo na like button ar moto , amra reload karar somoi aita dekhta chai tai amder useEffect use karte
hobe

useEffect(() => {
    
},[])

tarpor ai useEffect ar vitore amder onAuthStateChanged k call karte hobe, tarpor 2 ta parameter nibe auth, currentUser and amra currentUser k console karte pari and
setUser(currentUser) bosie dibo. 

tarpor aita k abr aktu clean karte hoi, usually people nam dei const = unSubscribe and unSubscribe k pore function a return kare dea hoi


useEffect(() => {
    const usSubscribe = onAuthStateChanged(auth, currentUser => {
        console.log('User in th auth state changed', currentUser)
        setUser(currentUser)
    } );
    return () => {
        usSubscribe();
    }

},[])

10. sign out ar jonno firebase ar password authentication ar moddhe signout ar functionality ase
 const logOut = () =>{
        return signOut(auth);
    }

tarpor ai logout k authInfo te bosai dibo
 const authInfo = {user, createUser, logOut} 
  and Navbar.jsx file destructure kare felbo
     const { user, logOut } = useContext(AuthContext);

 arpor Navbar a login button take amra conditon ar moddhe nie jabo login karle logout button dekhabe 
 and logout karle login button dekhabe

 {
         user ? <button className="btn">Sing Out</button>
         :

        <Link to="/login">
               <button className="btn">Login</button>
         </Link>
   }
arpor sign out button ar jonno akta eventhandler nite hobe and ar kono paramete thakbe na, tarpor oi function ar vitor 
logOut k call kare dibo and .then() and .catch() dibo tarpor eventhandler function  k button ar moddhe onClick kare dite hobe.

11. arpor abar login form ar moddhe setup karte hobe, login holo Registration ar khalato vai. firebase password authentication
ar moddhe ase. signIn 2 ta paramete nei (email, password) and signInWithEmailAndPassword k call kara hobe tokhon se 3 ta 
parameter nibe call kara somoi return kare dite hobe.

  const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    tarpor sign in k amra context a rekhe dite pari jno onno jaiga theke use karte pari
 const authInfo = { user, createUser, signIn, logOut }


 tarpor Login.jsx file a destrructure karte hobe 
 const { signIn } = useContext(AuthContext)

 akhane(Login.jsx) file a jehetu amra form take set karsi sehetu amra eamil adn password k nie nite pari

    const handleLogin = e => {
        e.preventDefault(); 
        console.log(e.currentTarget)
        const form = new FormData(e.currentTarget);
        const email = form.get(('email'))
        const password = form.get(('password'))
        console.log(email, password)
    }
console karle amra user ar information passi, jehetu amra information k passi sehetu amra signIn k call kare dite pari
and parameter hisebe jabe (email, password) tarpor .then() and .catch()

 */


import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
// import email from "surge/lib/middleware/email";


export const AuthContext = createContext(null);
const auth = getAuth(app);





const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth);
    }


    useEffect(() => {
        const usSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('User in th auth state changed', currentUser)
            setUser(currentUser)
        });
        return () => {
            usSubscribe();
        }

    }, [])


    const authInfo = { user, createUser, signIn, logOut }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;