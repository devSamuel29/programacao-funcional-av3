(ns external.uuid)

(defn genarate-uuid []
  (str (java.util.UUID/randomUUID)))