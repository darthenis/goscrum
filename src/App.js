import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

//lazyimports
const Tasks = lazy(() => import('./views/Tasks/Tasks'));
const Login = lazy(() => import('./views/auth/Login/Login'));
const Register = lazy(() => import('./views/auth/Register/Register'));
const PageNotFound = lazy(() => import('./views/PageNotFound/PageNotFound'));
const Registered = lazy(() => import('./views/registered/Registered'));
const Donate = lazy(() => import('./views/donate/Donate'));

export const App = () => {

  const pageTransition = {
    initial: {
    opacity: 0,
    x: '-100vw'
    },
    animate: {
    x: 0,
    opacity: 1,
    transition: {
    duration: 0.5,
    ease: [0.6, -0.05, 0.01, 0.99]
    }
    },
    exit: {
    x: '-100vw',
    opacity: 0,
    transition: {
    duration: 0.5,
    ease: [0.6, -0.05, 0.01, 0.99]
    }
    }
  }

  const RequiredAuth = ({ children }) => {

    if(!sessionStorage.getItem('token')) {
      return <Navigate to="/login" />
    }

    return children;

  }


  const Logged = ({ children }) => {

    if(sessionStorage.getItem('token')) {
      return <Navigate to="/tasks" />
    }

    return children;

  }


  return (
    <AnimatePresence>
      <Routes>
          
          <Route path="/" element={<RequiredAuth><Navigate to="/tasks"/></RequiredAuth>}/>
          
          <Route path="/login" element={
              <Logged>
                <motion.div
                  className='page'
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}>
                    <Suspense fallback={<h1>Cargando...</h1>}>
                      <Login />
                    </Suspense>
                </motion.div>
              </Logged>} />

          <Route path="/register" element={
            <Logged>
              <motion.div
                  className='page'
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}>
                  <Suspense fallback={<h1>Cargando...</h1>}>
                    <Register />
                  </Suspense>
                </motion.div>
            </Logged>} />

            <Route path="/registered/:teamID" element={
            <Logged>
              <motion.div
                  className='page'
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}>
                  <Suspense fallback={<h1>Cargando...</h1>}>
                    <Registered />
                  </Suspense>
                </motion.div>
            </Logged>} />

            <Route path="/tasks" element={
              <RequiredAuth>
                <motion.div
                  className='page'
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}>
                    <Suspense fallback={<h1>Cargando...</h1>}>
                      <Tasks />
                    </Suspense>
                </motion.div>
              </RequiredAuth>} />
              
            <Route path="/donate" element={
              <RequiredAuth>
                <motion.div
                  className='page'
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}>
                    <Suspense fallback={<h1>Cargando...</h1>}>
                      <Donate />
                    </Suspense>
                </motion.div>
              </RequiredAuth>} />

          <Route path="*" element={
            <Suspense fallback={<h1>Cargando...</h1>}>
              <PageNotFound />
            </Suspense>} />
      </Routes>
    </AnimatePresence>
  );
}
