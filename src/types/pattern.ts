/**
 * Handle returns the same type on output as on input
 */
export type Handle<T> = (value: T) => T

/**
 * Predicate return a Boolean
 */
export type Predicate<T> = (value: T) => Boolean

/**
 * Function returns the same or a different type on output as on input
 */
export type Function<T, O> = (value: T) => O

/**
 * Pattern returns the object with functions predicate & execution
 */
export interface Pattern<T, O> {
  predicate: Predicate<T>
  execution: Function<T, O>
}
