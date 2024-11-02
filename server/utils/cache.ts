interface CacheItem<T> {
    value: T;
    timestamp: number;
}

class Cache<T> {
    private cache: Map<string, CacheItem<T>> = new Map();
    private ttl: number;

    constructor(ttlSeconds: number = 300) { // Default 5 minutes TTL
        this.ttl = ttlSeconds * 1000;
    }

    set(key: string, value: T): void {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    get(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    clear(): void {
        this.cache.clear();
    }
}

// Create view count cache instance
export const viewCountCache = new Cache<number>(300); // 5 minutes TTL
export const batchViewCountCache = new Cache<Record<string, number>>(300); 