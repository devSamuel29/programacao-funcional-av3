(ns backend.handler
  (:require [compojure.core :refer [defroutes]]
            [compojure.route :as route]
            [controllers.blockchain-controller :refer [blockchain-routes]]
            [controllers.financial-controller :refer [financial-routes]]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.defaults :refer [api-defaults wrap-defaults]]
            [ring.middleware.json :refer [wrap-json-body]]))

(defroutes app-routes
  financial-routes
  blockchain-routes
  (route/not-found "Not Found"))

(def app
  (->
   (wrap-defaults app-routes api-defaults)
   (wrap-json-body {:keywords? true :bigdecimals? true})
   (wrap-cors
    :access-control-allow-origin [#".*"]
    :access-control-allow-methods [:get :post :put :delete :options]
    :access-control-allow-headers ["Content-Type" "Authorization"])))
