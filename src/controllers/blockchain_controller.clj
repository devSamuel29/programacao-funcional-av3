(ns controllers.blockchain-controller
  (:require [compojure.core :refer [defroutes GET POST]]
            [external.json :refer [as-json]]
            [repositories.blockchain-repository :refer [create-block
                                                        read-blocks]]))

(defroutes blockchain-routes
  (GET "/read-blocks" [] (-> (read-blocks)
                             (as-json)))
  (POST "/create-block" request (-> (create-block (:body request))
                                    (as-json))))
