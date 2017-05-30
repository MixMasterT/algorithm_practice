class MaxMinHeap
    def initialize(&prc)
        @prc = prc
        @store = []
    end

    def peek
        @store[@store.length]
    end

    def insert(val)
        @store << val
        heapify_up
    end

    def extract
        swap!(0, @store.length - 1)
        return_val = @store.pop
        heapify_down
        return_val
    end

    private

    def heapify_up
        return if @store.length < 2
        current = @store.length - 1
        p_id = parent_idx(current)
        while p_id && @prc.call(@store[p_id], @store[current]) > 0
            swap!(current, p_id)
            current = p_id
            p_id = parent_idx(current)
        end
    end

    def heapify_down
        return if @store.length < 2
        current = 0
        f_idx, s_idx = children_idxs(current)
        swapper = f_idx if f_idx
        swapper = s_idx if s_idx && @prc.call(@store[f_idx], @store[s_idx]) > 1
        while swapper && @prc.call(@store[swapper], @store[current]) < 0
            swap!(current, swapper)
            current = swapper
            f_idx, s_idx = children_idxs(current)
            swapper = f_idx if f_idx
            swapper = s_idx if s_idx && @prc.call(@store[f_idx], @store[s_idx]) > 1
        end
    end

    def swap!(i, j)
        @store[i], @store[j] = @store[j], @store[i]
    end

    def children_idxs(i)
        idxs = []
        idxs << (2*i + 1) if @store.length > (2*i + 1)
        idxs << (2*i + 2) if @store.length > (2*i + 2)
        idxs
    end

    def parent_idx(i)
        return nil if i == 0
        if i.even?
            (i / 2) - 1
        else
            i / 2
        end
    end
end

if __FILE__ == $0
  h = MaxMinHeap.new { |a, b| a <=> b }

  h.insert(2)
  h.insert(6)
  h.insert(9)
  h.insert(10)
  h.insert(1)

  p h

  puts h.extract

  p h

  h2 = MaxMinHeap.new { |a, b| b <=> a }
  h2.insert(2)
  h2.insert(6)
  h2.insert(9)
  h2.insert(10)
  h2.insert(1)
  p h2
  puts h2.extract
  p h2
end
