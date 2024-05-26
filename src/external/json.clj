(ns external.json
  (:require [cheshire.core :as json]))

(defn as-json [conteudo]
  {:headers {"Content-Type" "application/json; charset=utf-8"}
   :body (json/generate-string conteudo)})