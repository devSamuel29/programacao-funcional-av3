(ns repositories.financial-repository
  (:require [databases.db :refer [transactions]]
            [external.uuid :refer [generate-uuid]]))

(defn read-transactions []
  @transactions)

(defn create-transaction [request]
  (let [transaction (assoc request :id (generate-uuid))]
    (swap! transactions conj transaction)))
