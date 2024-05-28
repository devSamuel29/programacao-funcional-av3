(ns validators.financial-validator)

(defn valid-transaction? [request]
  (let [allowed-keys #{:value :type}]
    (and (contains? request :value)
         (number? (:value request))
         (pos? (:value request))
         (contains? request :type)
         (or (= (:type request) "Receita")
             (= (:type request) "Despesa"))
         (= allowed-keys (set (keys request))))))