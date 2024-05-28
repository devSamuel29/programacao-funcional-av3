(ns repositories.blockchain-repository
  (:require [external.proof-of-work :refer [proof-of-work]]
            [external.uuid :refer [generate-uuid]]))

(defonce ^:private blocks (atom []))

(defn read-blocks []
  @blocks)

(defn create-block [request]
  (let [id (generate-uuid)
        block-count (count @blocks)
        previous-block (when (> block-count 0) (last @blocks))
        previous-hash (if previous-block
                        (:hash previous-block)
                        nil)
        proof-of-work (if (nil? previous-block)
                        (proof-of-work request)
                        (proof-of-work (str previous-hash request)))
        block (assoc proof-of-work :id id :previous-hash previous-hash)]
    (swap! blocks conj block)))
