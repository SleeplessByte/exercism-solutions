(ns annalyns-infiltration)

(defn can-fast-attack?
  "Returns true if a fast-attack can be made, false otherwise."
  [knight-awake?]
  (not knight-awake?)
)

(defn can-spy?
  "Returns true if the kidnappers can be spied upon, false otherwise."
  [knight-awake? archer-awake? prisoner-awake?]
  (or knight-awake? (or archer-awake? prisoner-awake?))
)

(defn can-signal-prisoner?
  "Returns true if the prisoner can be signalled, false otherwise."
  [archer-awake? prisoner-awake?]
  (and prisoner-awake? (not archer-awake?))
)

(defn can-free-prisoner?
  "Returns true if prisoner can be freed, false otherwise."
  [knight-awake? archer-awake? prisoner-awake? dog-present?]
  (and
      (not archer-awake?)
      (or dog-present? (and prisoner-awake? (not knight-awake?)))
  )
)

;; The following logic follows the description exactly. However,
;; we can see from this that the archer is never allowed to be awake
;; so it can be simplified like above.
;;
;; It is simplified by moving the check if the archer is awake to the
;; outside, so each character only needs to be checked once.
;;
;; (or 
;;     (and dog-present? (not archer-awake?))
;;     (and prisoner-awake? (not (or knight-awake? archer-awake?)))
;; ) 
