(ns validators.block-validator)

(defn valid-block? [request]
  (let [allowed-keys #{:data}]
    (and (contains? request :data)
         (vector? (:data request)))
    (= allowed-keys (set (keys request)))))