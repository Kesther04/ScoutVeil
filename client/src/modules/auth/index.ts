export { default as AuthPage } from "./pages/AuthPage";
export { AuthContext, AuthProvider, type AuthContextType } from "./context/AuthContext";
export { useAuth, getErrorMessage, getFieldError } from "./hooks/useAuth";


/*
 * Routing (react-router-dom):
 *
 *   <Route element={<AuthPage />}>
 *     <Route path="/auth/login" />
 *     <Route path="/auth/register" />
 *     <Route path="/auth/forgot-password" />
 *     <Route path="/auth/reset-password" />
 *     <Route path="/auth/complete-profile" />
 *   </Route>
 *
 * Or simpler, since AuthPage reads the path itself:
 *
 *   <Route path="/auth/:mode" element={<AuthPage />} />
 *
 * Wrap the app in <AuthProvider> above the router so useAuth() is
 * available in AuthPage and the rest of the app (e.g. a nav login state).
 *
 * Env vars needed:
 *   VITE_API_URL           — e.g. https://api.traqbill... or your backend base URL
 *   VITE_GOOGLE_CLIENT_ID   — OAuth client ID from Google Cloud Console
 *
 * Backend contract this module expects (Express side):
 *   POST /auth/login              { email, password, rememberMe } -> { user, tokens }
 *   POST /auth/register           { fullName, companyName, email, password } -> { user, tokens }
 *   POST /auth/google             { credential } -> { user, tokens }
 *   POST /auth/complete-profile   { companyName, role? } -> { user }   (auth'd)
 *   POST /auth/forgot-password    { email } -> { message }
 *   POST /auth/reset-password     { token, password } -> { message }
 *   GET  /auth/me                 -> { user }
 *   POST /auth/logout             -> { message }
 *
 * A Google sign-up that has no companyName yet should come back from
 * /auth/google (and /auth/me) with user.profileIncomplete = true; AuthPage
 * redirects those users to /auth/complete-profile automatically.
 */