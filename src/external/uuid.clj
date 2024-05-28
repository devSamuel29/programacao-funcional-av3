(ns external.uuid)

(defn generate-uuid []
  (str (java.util.UUID/randomUUID)))