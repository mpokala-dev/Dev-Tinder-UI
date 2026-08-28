import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Body from "./components/Body";
import Login from "./components/Login";
import { Profile } from "./components/Profile";
import Connections from "./components/Connections";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import ErrorPage from "./components/ErrorPage";
import ReviewRequests from "./components/ReviewRequests";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import Test from "./test";

function App() {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ resetErrorBoundary }) => (
          <div className="checkout">
            <h2>Something went wrong</h2>
            <p>The action could not be completed.</p>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        )}
      >
        <Provider store={appStore}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Body />}>
                <Route path="/test" element={<Test />} />
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/review-requests" element={<ReviewRequests />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
                <Route path="/error" element={<ErrorPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
