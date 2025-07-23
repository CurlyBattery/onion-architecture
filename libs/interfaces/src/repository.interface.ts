export interface IRepository<T> {
  get(id: number): Promise<T>;
  delete(id: number): Promise<void>;
  save(input: T): Promise<T>;
  update(id: number, input: Partial<T>): Promise<T>;
  getAll(): Promise<T[]>;
}
