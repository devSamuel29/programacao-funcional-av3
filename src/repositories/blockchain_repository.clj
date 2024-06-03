(ns repositories.blockchain-repository
  (:require [databases.db :refer [blocks]]
            [external.proof-of-work :refer [proof-of-work]]))

(def id-counter (atom -1))

(defn read-blocks []
  @blocks)

(defn create-block [request]
  (let [id (swap! id-counter inc)
        block-count (count @blocks)
        previous-block (when (> block-count 0) (last @blocks))
        previous-hash (if previous-block
                        (:hash previous-block)
                        nil)
        proof-of-work (if (nil? previous-block)
                        (proof-of-work request)
                        (proof-of-work (str previous-hash request)))
        transactions (:transactions request)
        block (assoc proof-of-work :id id :previous_hash previous-hash :transactions transactions)]
    (swap! blocks conj block)))
