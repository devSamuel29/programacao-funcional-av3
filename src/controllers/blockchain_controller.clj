(ns controllers.blockchain-controller
  (:require [compojure.core :refer [defroutes GET POST]]
            [external.json :refer [as-json]]
            [repositories.blockchain-repository :refer [create-block
                                                        read-blocks]]
            [validators.block-validator :refer [valid-block?]]))

(defroutes blockchain-routes
  (GET "/read-blocks" [] (-> (read-blocks)
                             (as-json)))
  (POST "/create-block" request
    (if (valid-block? (:body request)) (->
                                        (create-block (:body request))
                                        (as-json))
        (as-json {:message "Bad Request"} 400))))
