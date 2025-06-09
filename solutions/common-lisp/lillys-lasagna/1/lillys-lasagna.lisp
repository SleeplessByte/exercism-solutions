(defpackage :lillys-lasagna (:use :cl) (:export :expected-time-in-oven :remaining-minutes-in-oven :preparation-time-in-minutes :elapsed-time-in-minutes))

(in-package :lillys-lasagna)

(defun expected-time-in-oven ()
  "The expected oven time in minutes is 337"
  337
  )

(defun remaining-minutes-in-oven (actual)
  "How many minutes the lasagna still has to remain in the oven,
  based on the expected oven time in minutes from the previous
  task."
  (- (expected-time-in-oven) actual)
  )

(defun preparation-time-in-minutes (layers) 
  "Assuming each layer takes 19 minutes to prepare, returns the
  total preparation time in minutes."
  (* 19 layers)
  )

(defun elapsed-time-in-minutes (layers actual) 
  "How many minutes in total has been spent cooking the lasagna,
  which is the sum of the preparation time in minutes, and the
  time in minutes the lasagna has spent in the oven at the moment."
  (+ (preparation-time-in-minutes layers) actual)
  )
