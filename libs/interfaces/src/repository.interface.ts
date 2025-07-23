export interface IRepository<T> {
  get(id: number): Promise<T>;
  delete(id: number): void;
  save(input: T): Promise<T>;
  update(input: T): Promise<T>;
  getAll(): Promise<T[]>;
}
