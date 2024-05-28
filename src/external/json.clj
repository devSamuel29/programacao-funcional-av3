(ns external.json
  (:require [cheshire.core :as json]))

(defn as-json
  ([content]
   (as-json content 200))
  ([content status]
   {:status status
    :headers {"Content-Type" "application/json; charset=utf-8"}
    :body (json/generate-string content)}))
