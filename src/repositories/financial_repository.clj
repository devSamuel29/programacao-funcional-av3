(ns repositories.financial-repository
  (:require [external.uuid :refer [generate-uuid]]))

(defonce ^:private transactions (atom []))

(defn read-transactions []
  @transactions)

(defn create-transaction [request]
  (let [transaction (assoc request :id (generate-uuid))]
    (swap! transactions conj transaction)))
