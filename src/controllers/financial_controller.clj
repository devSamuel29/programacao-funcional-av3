(ns controllers.financial-controller
  (:require [compojure.core :refer [defroutes DELETE GET POST]]
            [external.json :refer [as-json]]
            [repositories.financial-repository :refer [create-transaction
                                                       delete-transactions
                                                       read-transactions]]))

(defroutes financial-routes
  (GET "/read-finances" [] (-> (read-transactions)
                               (as-json)))
  (POST "/create-finance" request (-> (create-transaction (:body request))
                                      (as-json)))
  (DELETE "/delete-finances" [] (delete-transactions)))
