
class MaxMinHeap
    def initialize(&prc)
        @prc = prc
        @store = []
    end

    def peek
        @store[0]
    end

    def insert(val)
        @store << val
        heapify_up
        heapify_down
    end

    def extract
        swap!(0, @store.length - 1)
        return_val = @store.pop
        heapify_down
        return_val
    end

    def count
        @store.count
    end

    def expose
        p @store
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
        swapper = s_idx if s_idx && @prc.call(@store[f_idx], @store[s_idx]) > 0
        while swapper && @prc.call(@store[swapper], @store[current]) < 0
            swap!(current, swapper)
            current = swapper
            f_idx, s_idx = children_idxs(current)
            swapper = f_idx if f_idx
            swapper = s_idx if s_idx && @prc.call(@store[f_idx], @store[s_idx]) > 0
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

def track_medians(vals)
  current = 0

  #maxheap for low
  low = MaxMinHeap.new { |a, b| b <=> a }
  #minheap for high
  high = MaxMinHeap.new { |a, b| a <=> b }

vals.each do |v|
      #keep low equal to or 1 greater in length than high
      if high.count == 0 && low.count == 0
          low.insert(v)
          puts v.round(1)
      elsif high.count == 0 && low.count == 1
          if v < low.peek
              high.insert(low.extract)
              low.insert(v)
          else
              high.insert(v)
          end
          puts ((low.peek + high.peek) / 2.0).round(1)

      elsif high.count == low.count #insert into low
          if v >= high.peek
              bottom_of_high = high.extract
              high.insert(v)
              low.insert(bottom_of_high)
          else
              low.insert(v)
          end
          puts low.peek.round(1)

      else #insert into high
          if v <= low.peek
              high.insert(low.extract)
              low.insert(v)
          else
              high.insert(v)
          end
          puts ((low.peek + high.peek) / 2.0).round(1)
      end

      puts current
      current += 1
  end
end

if __FILE__ == $0
nums = File.readlines('input.txt').map(&:strip).map(&:to_i)
#
# p nums
#
# puts nums.length

track_medians(nums)
end
