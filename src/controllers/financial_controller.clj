(ns controllers.financial-controller
  (:require [compojure.core :refer [defroutes GET POST]]
            [external.json :refer [as-json]]
            [repositories.financial-repository :refer [create-transaction
                                                       read-transactions]]))

(defroutes financial-routes
  (GET "/read-finances" [] (as-json (read-transactions)))
  (POST "/create-finance" request (-> (create-transaction (:body request))
                                      (as-json))))
