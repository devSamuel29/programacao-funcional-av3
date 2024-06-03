(ns controllers.financial-controller
  (:require [compojure.core :refer [defroutes GET POST]]
            [external.json :refer [as-json]]
            [repositories.financial-repository :refer [create-transaction
                                                       read-transactions]]
            [validators.financial-validator :refer [valid-transaction?]]))

(defroutes financial-routes
  (GET "/read-transactions" [] (-> (read-transactions)
                                   (as-json)))
  (POST "/create-transaction" request
    (if (valid-transaction? (:body request))
      (-> (create-transaction (:body request))
          (as-json))
      (as-json {:message "Bad Request"} 400))))
