(ns external.proof-of-work
  (:require [external.sha-256 :refer [sha-256]]))

(defn proof-of-work
  ([data]
   (proof-of-work data 4 0))
  ([data difficulty]
   (proof-of-work data difficulty 0))
  ([data difficulty nonce]
   (let [hash (sha-256 (str data nonce))
         target (apply str (repeat difficulty "0"))]
     (if (.startsWith hash target)
       {:nonce nonce :hash hash}
       (recur data difficulty (inc nonce))))))