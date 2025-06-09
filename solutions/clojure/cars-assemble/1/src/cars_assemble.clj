(ns cars-assemble)

(defn production-rate
  "Returns the assembly line's production rate per hour,
   taking into account its success rate"
  [speed]
  (cond
    (= speed 0)  (* 0.00 (* 221 speed))  ;; I understand you could just do 0.00, but I like the symmetry when reading
    (< speed 5)  (* 1.00 (* 221 speed))  ;; I understand you could just do (* 221 speed), but ^
    (< speed 9)  (* 0.90 (* 221 speed))
    (= speed 9)  (* 0.80 (* 221 speed))
    (= speed 10) (* 0.77 (* 221 speed))
  )
)

(defn working-items
  "Calculates how many working cars are produced per minute"
  [speed]
  (int (/ (production-rate speed) 60))
)
