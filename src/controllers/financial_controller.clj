(ns controllers.financial-controller
  (:require [compojure.core :refer [defroutes DELETE GET POST]]
            [external.json :refer [as-json]]
            [repositories.financial-repository :refer [create-transaction
                                                       delete-transactions
                                                       read-transactions]]
            [validators.financial-validator :refer [valid-transaction?]]))

(defroutes financial-routes
  (GET "/read-transactions" [] (-> (read-transactions)
                                   (as-json)))
  (POST "/create-transaction" request
    (if (valid-transaction? (:body request)) (-> (create-transaction (:body request))
                                                 (as-json))
        (as-json {:message "Bad Request"} 400)))
  (DELETE "/delete-transactions" [] (delete-transactions)))
