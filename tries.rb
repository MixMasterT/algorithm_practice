class TrieNode
  attr_reader :val, :children, :parent
  def initialize(val)
      @val = val
      @parent = nil
      @children = {}
  end
end

class Trie
  attr_accessor :root
  def initialize()
      @root = TrieNode.new('_')
  end

  def find_node(char, start_node = self.root)
      return start_node.children[char] if start_node.children[char]
      return nil unless start_node.children
      return nil if start_node.children.empty?
      target_node = nil
      start_node.children.each do |child_key, child_val|
        if child_val.class == TrieNode
          return child_val if child_val.val == char
          target_node = find_node(char, child_val)
          break if target_node
        end
      end
      target_node
  end

  def add_node(char, start_node = self.root)
      start_node.children[char] = TrieNode.new(char)
  end

  def add_word(word, start_node = self.root, idx = 0)
      if idx == word.length
          start_node.children["*"] = true
      else
          unless start_node.children[word[idx]]
              add_node(word[idx], start_node)
          end
          add_word(word, start_node.children[word[idx]], idx + 1)
      end
  end

  def count_words(str, start_node = self.root, idx = 0)
      if idx == str.length
          count_child_words(start_node)
      else
          if start_node.children[str[idx]]
              count_words(str, start_node.children[str[idx]], idx + 1)
          else
              0
          end
      end
  end

  def count_child_words(node)
      count = 0
      if node.class == TrieNode
        count += 1 if node.children['*']
        node.children.each do |child_key, child_value|
            total = 0
            total += count_child_words(child_value) if child_value.class == TrieNode
            count += total
        end
      end
      count
  end

  def show
    print_queue = [self.root]
    while print_queue.length > 0
      print_queue.each { |node| p node.val if node.class == TrieNode }
      puts
      old_queue = print_queue
      print_queue = []
      old_queue.each { |node| node.children.each { |_, v| print_queue << v } if node.class == TrieNode }
    end
  end
end

if __FILE__ == $0
  t = Trie.new
  # t.add_word('dog', t.root)
  # t.add_word('dot', t.root)
  # t.add_word('cat')
  # t.show
  # puts t.count_child_words(t.find_node('g'))
  t.add_word('hack')
  t.add_word('hackerank')
  puts t.count_words('h')
  puts t.count_words('hacker')
end
