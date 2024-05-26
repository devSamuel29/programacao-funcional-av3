(ns repositories.financial-repository
  (:require [external.uuid :refer [genarate-uuid]]))

(defonce transactions (atom []))

(defn read-transactions []
  @transactions)

(defn create-transaction [request]
  (let [transaction (assoc request :id (genarate-uuid))]
    (swap! transactions conj transaction)))
