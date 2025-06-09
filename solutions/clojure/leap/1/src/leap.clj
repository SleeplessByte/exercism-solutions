(ns leap)

(defn leap-year? [year] ;; <- argslist goes here
  (and
    (= (mod year 4) 0)
    (or
      (not (= (mod year 100) 0))
      (= (mod year 400) 0)
    )
  )
)
