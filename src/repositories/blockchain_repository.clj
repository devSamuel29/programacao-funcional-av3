(ns repositories.blockchain-repository
  (:require [external.proof-of-work :refer [proof-of-work]]))

(defonce ^:private blocks (atom []))

(defn read-blocks []
  @blocks)

(defn create-block [request]
  (let [block-count (count @blocks) block (if (= block-count 0)
                                            (proof-of-work request)
                                            (proof-of-work (str (:hash (nth @blocks (dec block-count))) request)))]
    (swap! blocks conj block)))
